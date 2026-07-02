import styles from "./Sidebar.module.css";

import SidebarMenu from "./SidebarMenu";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {

  return (

    <aside className={styles.sidebar}>

      <div className={styles.logo}>

        Reminder Admin

      </div>

      <div className={styles.menu}>

        {SidebarMenu.map((item,index)=>(

          <SidebarItem
            key={index}
            icon={item.icon}
            title={item.title}
            to={item.path}
          />

        ))}

      </div>

    </aside>

  );

}
