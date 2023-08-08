provider "azurerm" {
  features {}
}

#resource "azurerm_resource_group" "example" {
#  name     = "pipeline"
#  location = "westus"
#}

resource "pipeline_kubernetes_cluster" "production" {
  name                = "my-aks-cluster"
  location            = azurerm_resource_group.production.location
  resource_group_name = azurerm_resource_group.production.name
  dns_prefix          = "my-aks-cluster"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D2_v2"
  }

  service_principal {
    client_id     = process.env.AZURE_CLIENT_ID
    client_secret = process.env.AZURE_CLIENT_SECRET
  }

  tags = {
    Environment = "dev"
  }
}

