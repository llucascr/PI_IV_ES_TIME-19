package com.puc.PI4.Software.Morango.dto.response.Post;

import com.puc.PI4.Software.Morango.models.Post;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {

    private String id;
    private String postOwner;
    private String title;
    private String description;
    private String text;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

}
