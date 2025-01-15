variable "aws_region" {
  description = "Aws region"
  type        = string
  default     = "us-east-1"
}

variable "google_client_id" {
  description = "Google Client ID"
  type        = string
}

variable "google_client_secret" {
  description = "Google Client Secret"
  type        = string
}

variable "aws_cognito_user_pool_name" {
  description = "name of the cognito user pool"
  type        = string
  default     = "cognito-angular-demo-pool"
}

variable "aws_cognito_user_pool_client_name" {
  description = "name of the cognito user pool"
  type        = string
  default     = "cognito-angular-demo-pool-client"
}

variable "client_callback_urls" {
  description = "name of the cognito user pool"
  type        = list(string)
  default     = ["http://localhost:4200/auth-callback"]
}

variable "client_logout_urls" {
  description = "name of the cognito user pool"
  type        = list(string)
  default     = ["http://localhost:4200"]
}
