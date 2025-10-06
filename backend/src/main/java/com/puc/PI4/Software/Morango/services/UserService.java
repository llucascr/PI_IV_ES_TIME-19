package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.enums.RoleUser;
import com.puc.PI4.Software.Morango.dto.request.user.UserRequest;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.exceptions.user.UserAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.user.UserNotFound;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
                .createAt(LocalDateTime.now())
                .active(true)
                .role(RoleUser.USER)
                .organization(new Organization())
                .build();

        return modelMapper.map(userRepository.save(user), UserResponse.class);
    }

    public UserResponse listUserById(String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("User with id " + userId + " not found"));
        return modelMapper.map(user, UserResponse.class);
    }

    public Page<UserResponse> listAllUsers(int page, int numberOfUsers) {
        Pageable pageable = PageRequest.of(page, numberOfUsers);
        Page<User> users = userRepository.findAll(pageable);

        List<UserResponse> userResponses = users.getContent().stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .toList();

        return new PageImpl<>(userResponses, pageable, users.getTotalElements());
    }

    public UserResponse updateUser(String userId, UserRequest userRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("User with email " + userRequest.getEmail() + " not found"));

        User userUpdated = User.builder()
                .id(user.getId())
                .name(userRequest.getName() != null ? userRequest.getName() : user.getName())
                .email(userRequest.getEmail() != null ? userRequest.getEmail() : user.getEmail())
                .password(userRequest.getPassword() != null ? userRequest.getPassword() : user.getPassword())
                .createAt(user.getCreateAt())
                .updateAt(LocalDateTime.now())
                .active(user.getActive())
                .build();

        return modelMapper.map(userRepository.save(userUpdated), UserResponse.class);
    }

}
