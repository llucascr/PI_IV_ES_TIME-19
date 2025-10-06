package com.puc.PI4.Software.Morango.dto.response.Post;

import com.puc.PI4.Software.Morango.models.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {

    private String id;
    private String postOwner;
    private String title;
    private String description;
    private String text;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

}
