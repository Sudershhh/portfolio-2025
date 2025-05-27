import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactFormData {
  from: string;
  subject: string;
  body: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      reset();
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] bg-[#0a0a0a] text-white border border-zinc-800 p-4 sm:p-6 overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-white">
            Get in Touch
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm text-zinc-200">
                Your Email
              </Label>
              <Input
                id="from"
                type="email"
                placeholder="your.email@example.com"
                className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                {...register("from", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.from && (
                <p className="text-red-400 text-sm break-words">
                  {errors.from.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm text-zinc-200">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="What would you like to discuss?"
                className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <p className="text-red-400 text-sm break-words">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="body" className="text-sm text-zinc-200">
                Message
              </Label>
              <Textarea
                id="body"
                placeholder="Your message here..."
                className="w-full bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 h-32 sm:h-40 resize-none"
                {...register("body", { required: "Message is required" })}
              />
              {errors.body && (
                <p className="text-red-400 text-sm break-words">
                  {errors.body.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black hover:bg-zinc-200 transition-colors min-w-[100px]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
