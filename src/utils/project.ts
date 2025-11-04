export type Project = {
    number: string
    company: string
    technologies: string
    title: string
    year: string
    direction: "left" | "right"
    description: string[]
}


export const projects: Project[] = [
    {
        number: "01",
        company: "CERN – European Organization for Nuclear Research",
        technologies:
            "Terraform, Docker, OpenStack, Go, Puppet, Linux, GitLab CI/CD, Helm, Kubernetes",
        title: "Cloud Systems Engineer",
        year: "2025",
        direction: "left",
        description: [
            "Designed and operated infra for research workloads across OpenStack and Kubernetes.",
            "Built Terraform modules and policy checks. Automated image builds and cluster bootstrap.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Shipped GitLab CI/CD pipelines for Go and Helm releases. Cut deploy time and drift.",
            "Integrated Puppet with cluster IaC. Standardized base OS config and secrets handling.",
        ],
    },
    {
        number: "02",
        company: "NeoCargo",
        technologies:
            "Docker, Docker-Compose, Grafana, Prometheus, GitLab CI/CD, Java, Python, Spring Boot, Linux",
        title: "Software Engineer",
        year: "2023-2024",
        direction: "right",
        description: [
            "Implemented services in Java and Python for logistics tracking and billing.",
            "Packaged workloads with Docker. Wrote CI pipelines and release automation.",
            "Added metrics and dashboards with Prometheus and Grafana. Reduced MTTR.",
        ],
    },
    {
        number: "03",
        company: "Capgemini",
        technologies:
            "Docker, Kubernetes, Jenkins, Terraform, Grafana, Helm, Python, AWS",
        title: "Software Engineer",
        year: "2021-2023",
        direction: "left",
        description: [
            "Delivered AWS infra with Terraform and Helm for multiple client projects.",
            "Migrated Jenkins pipelines to containerized build agents. Parallelized test stages.",
            "Hardened clusters and built runbooks with actionable SLOs and alerts.",
        ],
    },
]