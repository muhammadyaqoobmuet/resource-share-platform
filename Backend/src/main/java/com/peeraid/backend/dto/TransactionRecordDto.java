package com.peeraid.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TransactionRecordDto {
    private long id;
    private UserDto lender;
    private UserDto borrower;
    private ResourceDto resource;
    private LocalDate startDate;
    private LocalDate endDate;

    public TransactionRecordDto() {

    }

    public TransactionRecordDto(long id, UserDto lender, UserDto borrower, ResourceDto resource, LocalDate startDate, LocalDate endDate) {
        this.id = id;
        this.lender = lender;
        this.borrower = borrower;
        this.resource = resource;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
