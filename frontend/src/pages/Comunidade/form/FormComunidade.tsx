import { Button, Input } from "components";
import { config } from "config";
import { useUI } from "context";
import { useEffect, useState } from "react";
import { apiFetch } from "utils";
import type { PostType } from "types";

export const FormComunidade = ({
  refetch,
  post,
}: {
  refetch: () => void;
  post?: PostType;
}) => {
  const ui = useUI();
  const [error, setError] = useState(false);
  const [title, setTitle] = useState<string>(post?.title || "");
  const [description, setDescription] = useState<string>(post?.description || "");
  const [text, setText] = useState<string>(post?.text || "");
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

   async function loadPosts() {
    setLoading(true);

    const { data } = await apiFetch({
      url: config.apiUrl + "/post/all",
      options: { method: "GET" },
    });

    if (data) setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function onSave(e: any) {
    e.preventDefault();

    const { error } = await apiFetch({
      url: config.apiUrl + "/post/create",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userId: "5f996f5b-6218-442a-b6a0-55834ed5b660",
          title: "Moranguetes",
          description: "Morango Tango Bombado",
          text: newPost,
        },
      },
    });

    if (error) {
      console.log(error);
      setError(true);
    } else {
      refetch();
      setNewPost("");
      loadPosts();
    }
  }

  return (
    <>
      <section style={{ marginTop: 20, maxWidth: 700 }}>
        <div
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <textarea
            placeholder="Compartilhe algo com a comunidade..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{
              width: "100%",
              height: 80,
              padding: 12,
              borderRadius: 12,
              border: "1px solid #ccc",
              resize: "none",
            }}
          />
          <button
            type="button"
            onClick={onSave}
            style={{
              alignSelf: "flex-end",
              background: "#f28b82",
              padding: "8px 14px",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              color: "white",
            }}
          >
            Postar
          </button>
        </div>
      </section>
      <section style={{ marginTop: 20, maxWidth: 700 }}>
        {loading && <p>Carregando posts...</p>}

        {!loading && posts.length === 0 && (
          <p style={{ opacity: 0.6 }}>Nenhuma postagem ainda.</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </>
  );
};