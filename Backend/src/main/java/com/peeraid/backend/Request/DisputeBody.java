package com.peeraid.backend.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DisputeBody {
    private String disputeType;
    private String disputeDetails;

    public DisputeBody() {
    }

    public DisputeBody(String disputeType, String disputeDetails) {
        this.disputeType = disputeType;
        this.disputeDetails = disputeDetails;
    }
}
