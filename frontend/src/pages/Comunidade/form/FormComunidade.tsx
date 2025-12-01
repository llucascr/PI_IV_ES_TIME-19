import { config } from "config";
import { useEffect, useState } from "react";
import { apiFetch } from "utils";

export const FormComunidade = ({
  refetch,
}: {
  refetch: () => void;
}) => {
  
  const [newPost, setNewPost] = useState("");

  async function loadPosts() {

     await apiFetch({
      url: config.apiUrl + "/post/update",
      options: { method: "GET" },
    });
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
          userId: localStorage.getItem("safratechUserId"),
          title: "Moranguetes",
          description: "Morango Tango Bombado",
          text: newPost,
        },
      },
    });

    if (error) {
      console.log(error);
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
          <button className="bg-[#ffc6c6] hover:bg-rose-300 px-2 py-1 rounded-md"
            type="button"
            onClick={onSave}
            style={{
              alignSelf: "flex-end",
              padding: "8px 14px",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              color: "black",
            }}
          >
            Postar
          </button>
        </div>
      </section>
    </>
  );
};