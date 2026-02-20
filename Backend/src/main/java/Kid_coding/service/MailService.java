package Kid_coding.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    public void sendResetEmail(String toEmail, String name, String token) {
        String resetLink = frontendUrl + "/reset-password?token=" + token;
        
        String content = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 10px; padding: 20px;'>" +
                "<h2 style='color: #7c3aed;'>Reset Your Password</h2>" +
                "<p>Hi <strong>" + name + "</strong>,</p>" +
                "<p>We received a request to reset your password for your <strong>Kid Coding</strong> account.</p>" +
                "<div style='text-align: center; margin: 30px 0;'>" +
                "<a href='" + resetLink + "' style='background-color: #7c3aed; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;'>Reset Password</a>" +
                "</div>" +
                "<p style='font-size: 12px; color: #666;'>This link will expire in 15 minutes for security reasons. If you did not request this, you can safely ignore this email.</p>" +
                "<hr style='border: 0; border-top: 1px solid #eee;'>" +
                "<p style='font-size: 12px; color: #999;'>Best regards,<br>The Kid Coding Support Team</p>" +
                "</div>";

        sendHtmlMessage(toEmail, "Password Reset Request – Kid Coding Platform", content);
    }

    public void sendPasswordChangedNotification(String email, String name) {
        String content = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1; border-radius: 10px; padding: 20px;'>" +
                "<h2 style='color: #059669;'>Password Successfully Changed</h2>" +
                "<p>Hi <strong>" + name + "</strong>,</p>" +
                "<p>Your password was successfully updated. If you did not make this change, please contact our support team immediately to secure your account.</p>" +
                "<hr style='border: 0; border-top: 1px solid #eee;'>" +
                "<p style='font-size: 12px; color: #999;'>Best regards,<br>The Kid Coding Support Team</p>" +
                "</div>";

        sendHtmlMessage(email, "Security Alert: Password Changed – Kid Coding Platform", content);
    }

    private void sendHtmlMessage(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // The 'true' flag makes it HTML
            
            mailSender.send(message);
        } catch (MessagingException e) {
            // Log the error in a real application
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}