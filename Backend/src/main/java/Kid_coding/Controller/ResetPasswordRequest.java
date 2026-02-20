package Kid_coding.Controller;

public class ResetPasswordRequest {
    private String token;
    private String newPassword;

    // Required for JSON deserialization
    public ResetPasswordRequest() {}

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}