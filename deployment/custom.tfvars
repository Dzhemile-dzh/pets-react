extra_target_groups = [
    {
          target_group_name_ext = "internal"
          health_check_endpoint = "/favicon.ico"
          health_check_healthy_threshold = "3"
          health_check_unhealthy_threshold = "3"
          health_check_timeout = "30"
          health_check_interval = "40"
          health_check_return_codes = "200"
          target_group_container_port = "8080"
    }
]