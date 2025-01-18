import { error } from "console";
import { func } from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setTodo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input value={toDo} onChange={onChange} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

interface Iform {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Iform>({
    defaultValues: {
      email: "bd@naver.com",
    },
  });
  const onValid = (data: Iform) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Passwords are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server is offline" });
  };
  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com eamils allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message && String(errors.email.message)}</span>
        <input
          {...register("firstName", {
            required: "Write here",
          })}
          placeholder="FristName"
        />
        <span>
          {errors?.firstName?.message && String(errors.firstName.message)}
        </span>
        <input
          {...register("lastName", {
            required: true,
            validate: (value) =>
              value.includes("Kim") ? "No Kim is allowed" : true,
          })}
          placeholder="LastName"
        />
        <span>
          {errors?.lastName?.message && String(errors.lastName.message)}
        </span>
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "The minimum length is 5",
            },
          })}
          placeholder="Password1"
        />

        <input
          {...register("password1", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "The minimum length is 5",
            },
          })}
          placeholder="Password1"
        />

        <span>
          {errors?.password1?.message && String(errors.password1.message)}
        </span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
