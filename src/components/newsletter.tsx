import { NEWSLETTER_ACTION, NEWSLETTER_SENDER } from "@/utils/site";

interface Props {
  text?: string;
  className?: string;
}

export function Newsletter(props: Props) {
  let className = "flex flex-col md:flex-row gap-4 items-center";
  if (props.className) className += ` ${props.className}`;

  return (
    <>
      <form
        className={className}
        target="_blank"
        method="post"
        action={NEWSLETTER_ACTION}
      >
        <input
          className="input input-bordered input-sm w-72"
          name="email"
          type="email"
          placeholder="Enter your email.."
          required
        />

        <input type="hidden" name="name" value="" />
        <input type="hidden" name="sender" value={NEWSLETTER_SENDER} />
        <button className="btn btn-primary btn-sm w-72">{props.text ?? 'Subscribe'}</button>
      </form>
    </>
  );
}
