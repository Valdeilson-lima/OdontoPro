// Button import removed (unused)
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";
import { SubscriptionButton } from "./subscription-button";

export function GridPlans() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {subscriptionPlans.map((plan, index) => (
        <Card
          key={plan.id}
          className={`flex flex-col w-full mx-auto mb-6  box-shadow-xl hover:scale-[1.02] transition-transform duration-300 ${
            index === 1 ? "border-emerald-500" : "border-gray-300 dark:border-gray-700"
          }`}
        >
          {index === 1 && (
            <div className="bg-emerald-500 w-full py-3 text-center text-white font-bold rounded-t-xl mt-[-24px]">
              <p className="font-semibold text-white uppercase">
                Promoção Exclusiva
              </p>
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground md:text-base"
                >
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground md:text-base line-through">
                {plan.oldprice}
              </p>
              <p className="text-2xl font-bold mb-2">{plan.price}</p>
            </div>
          </CardContent>
          <CardFooter>
           <SubscriptionButton type={plan.id === "BASIC" ? "BASIC" : "PROFESSIONAL"} />
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
