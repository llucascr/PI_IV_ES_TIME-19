package com.puc.PI4.Software.Morango.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "post")
public class Post {

    @Id
    private String id;

    private String title;
    private String description;
    private String text;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    private String userId;

    //TODO: idMonitoramento
}
