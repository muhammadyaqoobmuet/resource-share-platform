package com.peeraid.backend.mapper;

import com.peeraid.backend.dto.UserDto;
import com.peeraid.backend.models.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
                user.getUserId(),
                user.getName(),
                user.getEmail()
        );
    }

}
