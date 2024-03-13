export const PaymentFailIcon = (props) => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="32" cy="32" r="28" fill="#FF0000" />
      <path d="M21.6066 42.1127L32.2132 31.5061M42.8198 20.8995L32.2132 31.5061M32.2132 31.5061L21.6066 20.8995M32.2132 31.5061L42.8198 42.1127" stroke="#D9D9D9" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const PaymentSuccessStatus = (props) => {
  return (
    <svg width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="28" cy="28.8008" r="28" fill="#23A26D" fillOpacity="0.12" />
      <path d="M27.4993 15.4688C20.1527 15.4688 14.166 21.4554 14.166 28.8021C14.166 36.1487 20.1527 42.1354 27.4993 42.1354C34.846 42.1354 40.8327 36.1487 40.8327 28.8021C40.8327 21.4554 34.846 15.4688 27.4993 15.4688ZM33.8727 25.7354L26.3127 33.2954C26.126 33.4821 25.8727 33.5887 25.606 33.5887C25.3393 33.5887 25.086 33.4821 24.8993 33.2954L21.126 29.5221C20.7393 29.1354 20.7393 28.4954 21.126 28.1087C21.5127 27.7221 22.1527 27.7221 22.5393 28.1087L25.606 31.1754L32.4593 24.3221C32.846 23.9354 33.486 23.9354 33.8727 24.3221C34.2593 24.7087 34.2593 25.3354 33.8727 25.7354Z" fill="#23A26D" />
    </svg>
  )
}

export function CartIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 25'
      {...props}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.579 7.25H4.42a.75.75 0 00-.745.667l-1.334 12a.75.75 0 00.746.833h17.824a.75.75 0 00.745-.833l-1.333-12a.75.75 0 00-.745-.667z'
      ></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8.25 10.25v-3a3.75 3.75 0 017.5 0v3'
      ></path>
    </svg>
  );
}

export const DeleteIcon = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
    </svg>
  );
};

export const EditIcon = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
    </svg>
  );
};

export const EyeOpenIcon = (props) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M28.343 14.616a2.258 2.258 0 0 1 0 2.768c-1.991 2.599-6.767 7.95-12.343 7.95s-10.352-5.351-12.343-7.95a2.256 2.256 0 0 1 0-2.768c1.991-2.599 6.767-7.95 12.343-7.95s10.352 5.351 12.343 7.95v0Z"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const EyesClose = (props) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 13.8462C6 13.2939 5.55228 12.8462 5 12.8462C4.44772 12.8462 4 13.2939 4 13.8462H6ZM28 13.8462C28 13.2939 27.5523 12.8462 27 12.8462C26.4477 12.8462 26 13.2939 26 13.8462H28ZM4 13.8462C4 14.6376 4.48531 15.4527 5.0462 16.1258C5.64881 16.8489 6.49993 17.6002 7.54219 18.28C9.62867 19.6407 12.5658 20.7693 16 20.7693V18.7693C13.0035 18.7693 10.4406 17.7824 8.63473 16.6047C7.73084 16.0152 7.03773 15.3915 6.58264 14.8454C6.35492 14.5722 6.19948 14.3335 6.10502 14.1428C6.05827 14.0484 6.03053 13.9739 6.01518 13.9196C5.99958 13.8644 6 13.8415 6 13.8462H4ZM16 20.7693C19.4528 20.7693 22.394 19.544 24.4704 18.1447C25.5086 17.445 26.351 16.6884 26.9458 15.9925C27.2424 15.6455 27.4911 15.2976 27.6709 14.9647C27.8382 14.6552 28 14.2607 28 13.8462H26C26 13.7701 26.019 13.8146 25.9113 14.0141C25.8161 14.1902 25.6576 14.4214 25.4254 14.6931C24.9624 15.2348 24.2606 15.8743 23.3527 16.4862C21.5368 17.7099 18.978 18.7693 16 18.7693V20.7693Z"
        fill="#3A3A3C"
      />
      <path
        d="M16 20L16 23.5"
        stroke="#3A3A3C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 19L10 22"
        stroke="#3A3A3C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 19L22 22"
        stroke="#3A3A3C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.69233 16.3846L4.5 18.5"
        stroke="#3A3A3C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M25.3077 16.3846L27.5 18.5"
        stroke="#3A3A3C"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
