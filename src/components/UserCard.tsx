import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

// function UserCard({ user }: UserCardProps) {
//   return (
//     <div className="user-card">
//       <h3>{user.name}</h3>
//       <p>{user.email}</p>
//       <p>Role: {user.role}</p>
//     </div>
//   );
// }

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>): void => {
    onSelect(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Search:", e.target.value);
  };

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={handleClick}>Select</button>
      <input onChange={handleChange} placeholder="Search..." />
    </div>
  );
}

export default UserCard;
