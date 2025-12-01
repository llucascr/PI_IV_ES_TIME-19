package com.puc.PI4.Software.Morango.dto.request.Post;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostRequest {
    private String userId;
    private String title;
    private String description;
    private String text;
}
