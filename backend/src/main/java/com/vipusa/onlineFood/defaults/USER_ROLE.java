package com.vipusa.onlineFood.defaults;

public enum USER_ROLE {
    USER,
    RESTAURANT,
    ADMIN;

    //for Spring Security integration
    //UserRole.ADMIN.getAuthority(); Returns "ROLE_ADMIN
    public String getAuthority() {
        return "ROLE_" + this.name();
    }
}
