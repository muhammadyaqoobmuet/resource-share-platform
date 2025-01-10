package com.peeraid.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;


@Getter
@Setter
@ToString
public class UserRequestDto {

    private long id;
    private ResourceDto resourceDto;
    private UserDto lender;
    private UserDto borrower;
    private LocalDate requestDate;
    private String status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate returnDate;


    public UserRequestDto() {

    }
    public UserRequestDto(long id,ResourceDto resourceDto ,UserDto lender, UserDto borrower,String status ,LocalDate requestDate) {
        this.id = id;
        this.resourceDto = resourceDto;
        this.lender = lender;
        this.borrower = borrower;
        this.status = status;
        this.requestDate = requestDate;
    }

    public UserRequestDto(long id, ResourceDto resourceDto, UserDto lender, UserDto borrower,String status, LocalDate requestDate, LocalDate returnDate) {
        this.id = id;
        this.resourceDto = resourceDto;
        this.lender = lender;
        this.borrower = borrower;
        this.status = status;
        this.requestDate = requestDate;
        this.returnDate = returnDate;
    }
}
