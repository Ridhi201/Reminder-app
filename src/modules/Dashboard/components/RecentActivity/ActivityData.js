import {
  MdPersonAdd,
  MdDescription,
  MdWorkspacePremium,
} from "react-icons/md";

const activityData = [
  {
    id: 1,
    title: "New user registered",
    time: "2 min ago",
    icon: MdPersonAdd,
    color: "#22C55E",
  },
  {
    id: 3,
    title: "Template updated",
    time: "25 min ago",
    icon: MdDescription,
    color: "#F59E0B",
  },
  {
    id: 5,
    title: "Premium plan purchased",
    time: "Today",
    icon: MdWorkspacePremium,
    color: "#8B5CF6",
  },
];

export default activityData;
