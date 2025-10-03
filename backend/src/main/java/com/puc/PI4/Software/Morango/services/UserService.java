package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.user.UserRequest;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.exceptions.user.UserAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.user.UserNotFound;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public UserResponse createUser(UserRequest userRequest) {

        if (userRepository.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExist("User with email " + userRequest.getEmail() + " already exist");
        }

        User user = User.builder()
                .name(userRequest.getName())
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
                .build();

        return modelMapper.map(userRepository.save(user), UserResponse.class);
    }

}
