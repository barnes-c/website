import type { Skill } from "@/utils/types/skill"

export const skills: Skill[] = [

    {
        title: "Cloud Infrastructure",
        description: "Certified Kubernetes Administrator (CKA) and Developer (CKAD): Operating and scaling cloud infrastructure with OpenStack and Kubernetes",
        direction: "top",
    },
    {
        title: "Infrastructure as Code",
        description: "Terraform Associate Certified: Managing large-scale IaC across OpenStack and Kubernetes",
        direction: "right",
    },
    {
        title: "Monitoring & Reliability",
        description: "Prometheus, Mimir, Loki, Fluent Bit, and Grafana: Designing full observability stacks for production systems",
        direction: "left",
    },
    {
        title: "Linux Systems Engineering",
        description: "Linux administration, networking, bash, and performance tuning in production environments",
        direction: "right",
    },
    {
        title: "Scientific Writing & Documentation",
        description: "Master’s in Computer Science: Writing technical papers, documentation, and research material at CERN",
        direction: "bottom",
    },
    {
        title: "Web Development",
        description: "Designing and building responsive interfaces with React, Next.js, and modern frontend tooling (e.g. this website)",
        direction: "bottom",
    }
]