import type { Project } from "@/utils/types/project";

export const projects: Project[] = [
    {
        number: "01",
        company: "CERN – European Organization for Nuclear Research",
        technologies:
            "OpenStack, Terraform, Puppet, Go, Kubernetes, Python, Linux, GitLab CI/CD, Helm, Networking",
        title: "Cloud Systems Engineer",
        year: "2025–Now",
        direction: "left",
        description: [
            "Integrated new technologies into CERN’s private cloud to improve reliability and scalability.",
            "Maintained and optimized large-scale service offerings, including virtualization, networking, and load balancing.",
            "Collaborated with multiple IT teams to design and deploy new cloud features and integrations.",
            "Contributed upstream to the OpenStack community with patches and bug fixes for core services.",
            "Developed automation scripts and tools in Python/Go to streamline operations and testing workflows.",
            "Operated and hardened Linux-based cloud infrastructure, ensuring consistent performance and security.",
            "Implemented CI/CD pipelines with GitLab for Terraform, Helm, and Python-based deployments.",
            "Enhanced Puppet-driven configuration management to unify system state across clusters.",
            "Supported CERN’s research community in adopting and migrating to cloud-native technologies.",
        ],
    },
    {
        number: "02",
        company: "NeoCargo",
        technologies:
            "Docker, Docker-Compose, Grafana, Prometheus, GitLab CI/CD, Java, Python, Spring Boot, PostgreSQL, Linux",
        title: "Software Engineer",
        year: "2023–2025",
        direction: "right",
        description: [
            "Developed APIs and integration interfaces for telematics systems to connect with core logistics infrastructure.",
            "Implemented microservice-based Java architectures using Spring Boot and Python services for data processing.",
            "Built Dockerized environments with Docker Compose and automated deployment workflows in GitLab CI/CD.",
            "Deployed and maintained observability stacks with Prometheus, Grafana, and Nagios for real-time performance tracking.",
            "Prepared architectural designs and documentation for Java-based microservice deployments.",
            "Developed an SDK to enable third-party developers to integrate with NeoCargo’s telematics ecosystem.",
            "Created robust PostgreSQL-backed services ensuring reliability and scalability across distributed workloads.",
        ],
    },
    {
        number: "03",
        company: "Capgemini",
        technologies:
            "Docker, Kubernetes, Jenkins, Terraform, Helm, Grafana, Prometheus, Mimir, Fluent Bit, Kepler, AWS, Python",
        title: "Software Reliability Engineer",
        year: "2021–2023",
        direction: "left",
        description: [
            "Designed and deployed monitoring and observability stacks with Prometheus, Grafana Mimir, Fluent Bit, and Kepler.",
            "Implemented end-to-end metrics collection, log aggregation, and power usage monitoring across Kubernetes workloads.",
            "Built and maintained Infrastructure-as-Code solutions using Terraform for AWS services including EKS, RDS, EC2, and S3.",
            "Developed Helm charts to standardize telemetry configurations and alert routing across multiple environments.",
            "Automated CI/CD pipelines with Jenkins and the Jenkins Kubernetes Operator to deliver consistent observability updates.",
            "Defined and visualized SLOs, SLIs, and error budgets in Grafana to drive data-informed reliability decisions.",
            "Partnered with development teams to optimize application performance through instrumentation and trace analysis.",
        ],
    }
]