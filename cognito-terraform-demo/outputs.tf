output "client_id" {
  description = "clientid for angular user pool client"
  value       = aws_cognito_user_pool_client.demo_pool_client.id
}

output "client_secret" {
  description = "clientid for angular user pool client"
  value       = aws_cognito_user_pool_client.demo_pool_client.client_secret
  sensitive = true
}