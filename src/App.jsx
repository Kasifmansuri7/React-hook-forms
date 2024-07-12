import { Fragment, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let renderCount = 0;
const social = {
  twitter: 'twitterlink',
  linkedin: 'linkedin',
};
function App() {
  renderCount++;
  const form = useForm({
    defaultValues: {
      username: 'kashif',
      email: 'hey@yopmail.com',
      channel: 'travelWithKashif',
      twitter: social.twitter,
      linkedin: social.linkedin,
      phoneNumbers: ['ad', 'as'],
      hobbies: [{ name: 'cycling' }],
    },
  });
  const { register, control, getValues, handleSubmit, reset, formState } = form;
  const { errors } = formState;

  // it contains array methods
  const { fields, append, remove } = useFieldArray({
    name: 'hobbies',
    control,
  });

  const onSubmit = (data) => {
    console.log('data: ', data);
    console.log('fields: ', fields);
    console.log('formState: ', formState);
    // e.preventDefault();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1>YouTube Form - {renderCount}</h1>
        <form
          className="flex flex-col gap-2 border p-10"
          onSubmit={handleSubmit(onSubmit)}
          noValidate>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="p-2 border border-white  rounded-md"
            {...register('username', {
              required: 'Username is required.',
            })}
          />
          <p className="text-red-500 font-sm">{errors?.username?.message}</p>

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            className="p-2 border border-white  rounded-md"
            {...register('email', {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email format.',
              },
              required: {
                value: true,
                message: 'Email is required.',
              },
            })}
          />
          <p className="text-red-500 font-sm">{errors?.email?.message}</p>

          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            className="p-2 border border-white rounded-md"
            {...register('channel', {
              required: 'Channel is required.',
            })}
          />
          <p className="text-red-500 font-sm">{errors?.channel?.message}</p>

          <label htmlFor="channel">Twitter</label>
          <input
            type="text"
            id="twitter"
            className="p-2 border border-white rounded-md"
            {...register('twitter')}
          />

          <label htmlFor="channel">Linkedin</label>
          <input
            type="text"
            id="linkedin"
            className="p-2 border border-white rounded-md"
            {...register('linkedin')}
          />

          <label htmlFor="channel">Primary Phone Number</label>
          <input
            type="text"
            id="phoneNumbers.0"
            className="p-2 border border-white rounded-md"
            {...register('phoneNumbers.0', {
              required: 'Phone is required.',
            })}
          />

          <label htmlFor="channel">Secondary Phone Number</label>
          <input
            type="text"
            id="phoneNumbers.1"
            className="p-2 border border-white rounded-md"
            {...register('phoneNumbers.1')}
          />

          {fields &&
            fields.length != 0 &&
            fields.map((field, index) => (
              <Fragment key={field.id}>
                <label htmlFor="channel">Hobbies</label>
                <input
                  type="text"
                  id="hobbies.0.name"
                  className="p-2 border border-white rounded-md"
                  {...register(`hobbies.${index}.name`)}
                />
                {index > 0 && <p onClick={() => remove(index)}>-</p>}
              </Fragment>
            ))}

          <p onClick={append}>+</p>

          <button className="my-2">Submit</button>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}

export default App;
