provider "azurerm" {
  features {}
}

variable "azure_client_id" {}
variable "azure_client_secret" {}

resource "azurerm_kubernetes_cluster" "production" {
  name                = "my-aks-cluster"
  location            = "westus"
  resource_group_name = "pipeline"
  dns_prefix          = "my-aks-cluster"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2_v2"
  }

  service_principal {
    client_id     = var.azure_client_id
    client_secret = var.azure_client_secret
  }

  tags = {
    Environment = "dev"
  }
}
