package com.peeraid.backend.mapper;

import com.peeraid.backend.models.entity.TransactionRecord;
import com.peeraid.backend.dto.TransactionRecordDto;

public class TransactionRecordMapper {

    public static TransactionRecordDto mapToTransactionRecordDto(TransactionRecord transactionRecord) {
       return new TransactionRecordDto(
                transactionRecord.getId(),
                UserMapper.mapToUserDto(transactionRecord.getLender()),
                UserMapper.mapToUserDto(transactionRecord.getBorrower()),
                ResourceMapper.mapToResourceDto(transactionRecord.getBorrowedResource()),
                transactionRecord.getStatus().toString(),
                transactionRecord.getBorrowDate(),
                transactionRecord.getReturnDate()
        );
    }
}
