import { useAction } from "convex/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "@workspace/backend/_generated/api";

type PhoneNumbers = typeof api.private.vapi.getPhoneNumbers._returnType;
type Assistants = typeof api.private.vapi.getAssistants._returnType;

export const useVapiPhoneNumbers = (): {
  data: PhoneNumbers;
  isLoading: boolean;
  error: Error | null;
} => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumbers>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getPhoneNumbers = useAction(api.private.vapi.getPhoneNumbers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getPhoneNumbers();
        setPhoneNumbers(response);
        setError(null);
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to fetch phone numbers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getPhoneNumbers]);

  return { data: phoneNumbers, isLoading, error };
};

export const useVapiAssistants = (): {
  data: Assistants;
  isLoading: boolean;
  error: Error | null;
} => {
  const [assistants, setAssistants] = useState<Assistants>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getAssistants = useAction(api.private.vapi.getAssistants);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAssistants();
        setAssistants(response);
        setError(null);
      } catch (error) {
        setError(error as Error);
        toast.error("Failed to fetch assistants");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getAssistants]);

  return { data: assistants, isLoading, error };
};
