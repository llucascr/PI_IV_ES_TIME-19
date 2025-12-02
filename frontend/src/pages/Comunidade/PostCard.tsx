import type { PostType } from "types/post";
import { apiFetch } from "utils";
import { Button } from "components";
import { NotePencilIcon, TrashIcon } from "@phosphor-icons/react";
import { config } from "config";
import { FormComunidade } from "./form";

interface PostCardProps {
    post: PostType;
    refetch: () => void;
}

export const PostCard = ({ post, refetch }: PostCardProps) => {
    const user = localStorage.getItem("safratechUserId");
    async function deletarPost(id: React.Key) {
    // const {show} = useNotification();

    const { error } = await apiFetch({
        url: config.apiUrl + "/post/delete",
        options: {
            method: "DELETE",
            params: {
                postId: id,
                userId: user,
            },
        },
    });

    if (error) {
        // // show!(
        //     v4(),
        //     "Deletar Post",
        //     "error",
        //     "Não foi possível deletar o post."
        // );
        console.log("Não foi possível deletar o post.");
    } else {
        refetch();

        // show!(v4(), "Deletar Post", "error", "Post deletado com sucesso.");
        console.log("Post deletado com sucesso.");
    }

    // setSelectedPost(undefined);
}

    return (
        <div
            key={post.id}
            style={{
                background: "#fff",
                padding: 16,
                borderRadius: 16,
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <strong style={{ fontSize: 15 }}>
                        {post.postOwner}
                    </strong>
                    <span
                        style={{
                            fontSize: 12,
                            marginLeft: 6,
                            color: "#888",
                        }}
                    >
                        {post.createdAt
                            ? new Date(post.createdAt).toLocaleString()
                            : ""}
                    </span>
                </div>
            </div>

            <p style={{ whiteSpace: "pre-wrap", fontSize: 15 }}>
                {post.text}
            </p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: "1px solid #eee",
                }}
            >
                <button className="bg-[#fff] hover:bg-[#ffc6c6] px-2 py-1 rounded-md"
                    style={{
                        border: "none",
                        cursor: "pointer",
                        color: "#555",
                    }}
                >
                    Curtir
                </button>
                <button className="bg-[#fff] hover:bg-[#ffc6c6] px-2 py-1 rounded-md"
                    style={{
                        border: "none",
                        cursor: "pointer",
                        color: "#555",
                    }}
                >
                    Comentar
                </button>
                <button className="bg-[#fff] hover:bg-[#ffc6c6] px-2 py-1 rounded-md"
                    style={{
                        border: "none",
                        cursor: "pointer",
                        color: "#555",
                    }}
                >
                    Compartilhar
                </button>
                {
                    user === post.userId && (<div className="flex gap-2">
                    <Button
                        color="blue"
                        title=""
                        icon={<NotePencilIcon />}
                        positionIcon="left"
                        type="button"
                        // onClick={() =>
                        //     ui.show({
                        //         id: "update-post",
                        //         content: (
                        //             <FormComunidade
                        //                 action="update"
                        //                 post={rowData}
                        //                 refetch={() => {
                        //                     refetch();
                        //                     setSelectedPost(undefined);
                        //                 }}
                        //             />
                        //         ),
                        //         type: "modal",
                        //         options: {
                        //             titulo: "Editar Post",
                        //             position: "right",
                        //         },
                        //     })
                        // }
                    />
                    <Button
                        color="red"
                        title=""
                        icon={<TrashIcon />}
                        positionIcon="left"
                        type="button"
                        onClick={() => deletarPost(post.id)}
                    />
                </div>)
                }
                
            </div>
        </div>
    )
};