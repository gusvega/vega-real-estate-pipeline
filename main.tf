provider "azurerm" {
  features {}
}

resource "azurerm_kubernetes_cluster" "production" {
  name                = "my-aks-cluster"
  location            = "westus"  # Specify the correct location for your existing resource group
  resource_group_name = "pipeline"  # Specify the name of your existing resource group
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
