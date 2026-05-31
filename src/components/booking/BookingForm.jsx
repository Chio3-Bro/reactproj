import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getResources, getPriorities } from "../../api/bookingsApi";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";

const bookingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  resourceId: z.string().min(1, "Please select a resource"),
  priority: z.string().min(1, "Please select a priority"),
  date: z.string().min(1, "Please choose a date"),
  timeSlot: z.string().min(1, "Please enter a time slot"),
  contactEmail: z.string().email("Please enter a valid email"),
});

function BookingForm({ onSubmit, isSubmitting }) {
  const { token, user } = useAuth();

  const resourcesQuery = useQuery({
    queryKey: ["resources"],
    queryFn: () => getResources(token),
    enabled: !!token,
  });

  const prioritiesQuery = useQuery({
    queryKey: ["priorities"],
    queryFn: () => getPriorities(token),
    enabled: !!token,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      title: "",
      description: "",
      resourceId: "",
      priority: "",
      date: "",
      timeSlot: "",
      contactEmail: user?.email || "",
    },
  });

  if (resourcesQuery.isLoading || prioritiesQuery.isLoading) return <Loader />;
  if (resourcesQuery.isError)
    return <ErrorMessage message="Failed to load resources" />;
  if (prioritiesQuery.isError)
    return <ErrorMessage message="Failed to load priorities" />;

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title
        <input {...register("title")} />
        {errors.title && (
          <span className="field-error">{errors.title.message}</span>
        )}
      </label>

      <label>
        Description
        <textarea {...register("description")} />
        {errors.description && (
          <span className="field-error">{errors.description.message}</span>
        )}
      </label>

      <label>
        Resource
        <select {...register("resourceId")}>
          <option value="">Select resource</option>
          {resourcesQuery.data.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>
        {errors.resourceId && (
          <span className="field-error">{errors.resourceId.message}</span>
        )}
      </label>

      <label>
        Priority
        <select {...register("priority")}>
          <option value="">Select priority</option>
          {prioritiesQuery.data.map((priority) => (
            <option key={priority.id} value={priority.code}>
              {priority.label}
            </option>
          ))}
        </select>
        {errors.priority && (
          <span className="field-error">{errors.priority.message}</span>
        )}
      </label>

      <label>
        Date
        <input type="date" {...register("date")} />
        {errors.date && (
          <span className="field-error">{errors.date.message}</span>
        )}
      </label>

      <label>
        Time slot
        <input placeholder="e.g. 10:00 - 11:00" {...register("timeSlot")} />
        {errors.timeSlot && (
          <span className="field-error">{errors.timeSlot.message}</span>
        )}
      </label>

      <label>
        Contact email
        <input type="email" {...register("contactEmail")} />
        {errors.contactEmail && (
          <span className="field-error">{errors.contactEmail.message}</span>
        )}
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create booking"}
      </button>
    </form>
  );
}

export default BookingForm;
