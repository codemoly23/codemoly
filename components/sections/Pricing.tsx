"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Star, Zap, Crown, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormModal from "@/components/ui/FormModal";
import { useFormModal } from "@/hooks/useFormModal";

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: { monthly: 0, yearly: 0 },
    icon: <Rocket className="w-6 h-6" />,
    popular: false,
    features: [
      { name: "Up to 3 projects", included: true },
      { name: "Basic templates", included: true },
      { name: "Community support", included: true },
      { name: "1GB storage", included: true },
      { name: "Basic analytics", included: true },
      { name: "Advanced features", included: false },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
    ],
  },
  {
    name: "Professional",
    description: "Ideal for growing teams and businesses",
    price: { monthly: 29, yearly: 290 },
    icon: <Zap className="w-6 h-6" />,
    popular: true,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "Premium templates", included: true },
      { name: "Priority support", included: true },
      { name: "50GB storage", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Team collaboration", included: true },
      { name: "API access", included: true },
      { name: "Custom integrations", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: { monthly: 99, yearly: 990 },
    icon: <Crown className="w-6 h-6" />,
    popular: false,
    features: [
      { name: "Unlimited everything", included: true },
      { name: "Custom templates", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Unlimited storage", included: true },
      { name: "Enterprise analytics", included: true },
      { name: "Advanced team features", included: true },
      { name: "Full API access", included: true },
      { name: "Custom integrations", included: true },
    ],
  },
];

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { isOpen, openModal, closeModal } = useFormModal();

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Simple,
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isYearly
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                isYearly
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`relative ${
                plan.popular ? "lg:scale-105 lg:-mt-4" : ""
              }`}
              whileHover={{ y: -8, scale: plan.popular ? 1.05 : 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <Card
                variant={plan.popular ? "elevated" : "default"}
                className={`h-full ${
                  plan.popular
                    ? "ring-2 ring-blue-500 shadow-2xl"
                    : "hover:shadow-lg"
                } transition-all duration-300`}
              >
                <CardHeader className="text-center pb-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                      plan.popular
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {plan.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-gray-600 dark:text-gray-400 ml-2">
                          /{isYearly ? "year" : "month"}
                        </span>
                      )}
                    </div>
                    {isYearly && plan.price.monthly > 0 && (
                      <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Save ${plan.price.monthly * 12 - plan.price.yearly} per
                        year
                      </div>
                    )}
                  </div>

                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    size="lg"
                    className="w-full"
                    onClick={openModal}
                  >
                    {plan.price.monthly === 0
                      ? "Get Started Free"
                      : "Start Free Trial"}
                  </Button>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature.name}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: featureIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                      >
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                            feature.included
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                          }`}
                        >
                          {feature.included ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-gray-900 dark:text-gray-100"
                              : "text-gray-500 dark:text-gray-500"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions? We&apos;re here to help.
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Can&apos;t find what you&apos;re looking for? Contact our sales
            team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              View FAQ
            </Button>
            <Button variant="primary" size="lg" onClick={openModal}>
              Contact Sales
            </Button>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-full text-green-800 dark:text-green-200">
            <Check className="w-5 h-5 mr-2" />
            30-day money-back guarantee on all paid plans
          </div>
        </motion.div>
      </div>

      {/* Form Modal */}
      <FormModal isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};

export default Pricing;
