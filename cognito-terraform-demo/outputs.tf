output "client_id" {
  description = "clientid for angular user pool client"
  value       = aws_cognito_user_pool_client.demo_pool_client.id
}

output "client_secret" {
  description = "clientid for angular user pool client"
  value       = aws_cognito_user_pool_client.demo_pool_client.client_secret
  sensitive = true
}

output "cognito_domain" {
  description = "generated aws domain for the hosted login page"
  value = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.aws_region}.amazoncognito.com"
}