package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.enums.UserRole;
import com.puc.PI4.Software.Morango.dto.request.user.UserRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.UserAndOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.exceptions.user.*;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

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

    public UserResponse updateUser(@NotNull String userId, @Valid UserRequest userRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("User with email " + userRequest.getEmail() + " not found"));

        User userUpdated = User.builder()
                ._id(user.get_id())
                .id(user.getId())
                .name(userRequest.getName() != null ? userRequest.getName() : user.getName())
                .email(userRequest.getEmail() != null ? userRequest.getEmail() : user.getEmail())
                .password(userRequest.getPassword() != null
                        ? new BCryptPasswordEncoder().encode(userRequest.getPassword())
                        : user.getPassword())
                .cpf(userRequest.getCpf() != null ?  userRequest.getCpf() : user.getCpf())
                .createAt(user.getCreateAt())
                .updateAt(LocalDateTime.now())
                .active(user.getActive())
                .build();

        return modelMapper.map(userRepository.save(userUpdated), UserResponse.class);
    }

}
