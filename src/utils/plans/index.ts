export type PlanDetailsProps ={
    maxServices: number;
}

export type PlanProps = {
    BASIC: PlanDetailsProps;
    PROFESSIONAL: PlanDetailsProps;
}

export const PLANS: PlanProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
};

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Básico",
    description: "Plano básico",
    oldprice: "R$ 97,00",
    price: "R$ 27,90",
    features: [
        `Até ${PLANS.BASIC.maxServices} serviços`,
        "Agendamentos ilimitados",
        "Atendimento ao cliente",
        "Acesso ao suporte por email",
    ]
    
  },
  {
    id: "PROFESSIONAL",
    name: "Profissional",
    description: "Plano profissional",
    oldprice: "R$ 197,00",
    price: "R$ 97,90",
    features: [
        `Até ${PLANS.PROFESSIONAL.maxServices} serviços`,
        "Agendamentos ilimitados",
        "Atendimento ao cliente",
        "Acesso ao suporte por email",
        "Acesso ao suporte por chat",
    ]
  },
];