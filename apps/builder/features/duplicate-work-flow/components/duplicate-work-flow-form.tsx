import React from "react";
//libs
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
//schema
import { duplicateWorkflowSchemaType } from "@/schema/workflow";
//components
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";

type WorkflowFormProps = {
  form: UseFormReturn<duplicateWorkflowSchemaType>;
  onSubmit: (values: duplicateWorkflowSchemaType) => void;
  isPending: boolean;
};

const DuplicateWorkFlowForm = ({
  form,
  isPending,
  onSubmit,
}: WorkflowFormProps) => {
  return (
    <div className="p-6">
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 items-center">
                  Name <p className="text-xs text-primary">(required)</p>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Choose a descriptive and unique name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 items-center">
                  Description{" "}
                  <p className="text-xs text-muted-foreground">(optional)</p>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormDescription>
                  Provide a brief description of what your workflow does.
                  <br /> This is optional but can help you remember what your
                  workflow does.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {!isPending && "Proceed"}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DuplicateWorkFlowForm;
