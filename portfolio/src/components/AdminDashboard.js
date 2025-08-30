import AddSkill from "./AddSkill";
import AddProject from "./AddProject";
import UpdateBio from "./UpdateBio";

const AdminDashboard = () => {
  return (
    <div className="space-y-8 p-6">
      <AddSkill />
      <AddProject />
      <UpdateBio />
    </div>
  );
};

export default AdminDashboard;
