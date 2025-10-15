package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.user.UserRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.UserAndOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/listById")
    public ResponseEntity<UserResponse> listUserById(@RequestParam String userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.listUserById(userId));
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserResponse>> listAllUsers(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfUsers
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.listAllUsers(page, numberOfUsers).getContent());
    }

    @PutMapping("/update")
    public ResponseEntity<UserResponse> updateUser(@RequestParam String userId, @RequestBody UserRequest userRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(userId, userRequest));
    }

}
