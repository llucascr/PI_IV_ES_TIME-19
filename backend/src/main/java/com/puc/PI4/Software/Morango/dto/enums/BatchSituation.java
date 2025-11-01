package com.puc.PI4.Software.Morango.dto.enums;

public enum BatchSituation {
    RESERVED("reserved"),
    SOLD("sold");

    private String situation;

    BatchSituation(String situation) {
        this.situation = situation;
    }

    public String getSituation() {
        return this.situation;
    }
}
