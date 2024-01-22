import { LayerManager } from "../components/Layer";
import { MenuBar } from "../components/MenuBar";
import { Profile } from "./components/Profile";
import { Resume } from "./components/Resume";
import { Settings } from "./components/Settings";
import * as Shortcut from "./components/Shortcuts";
// import { scrollbarStyle } from "../../components/WindowFrame";

// const GitHubRepoWrapper = styled.div`
//   width: 100%;
//   margin: 4px 0;
//   padding: 12px 10px;
//   display: flex;ㄷㄷㄴㅇㅊㄴㅌ
//   flex-direction: column;
//   border: 1px rgba(255, 255, 255, 0.25) solid;
//   border-radius: 3px;
//   cursor: pointer;
//   transition: all 0.15s ease-out;
//   :hover {
//     background-color: rgba(255, 255, 255, 0.02);
//   }
//   > .repo-title {
//     display: flex;
//     align-items: baseline;
//     margin-bottom: 8px;
//     > .ant-typography {
//       margin-left: 6px;
//       font-size: 16px;
//       font-weight: 500;
//     }
//   }
//   > .ant-typography {
//     font-size: 12px;
//     font-weight: 300;
//     color: rgba(255, 255, 255, 0.8);
//   }
//   > .repo-language {
//     margin-top: 12px;
//     display: flex;
//     align-items: baseline;

//     > .lang-color {
//       width: 8px;
//       height: 8px;
//       border-radius: 4px;
//       margin-right: 4px;
//     }
//     > .ant-typography {
//       color: rgba(255, 255, 255, 0.6);
//       font-size: 10px;
//     }
//   }
// `;

// const RepositoryTab = (props: RepositoryTabProps) => {
//   const { loading, repositories } = props;

//   return (
//     <TabContentWrapper>
//       {loading ? (
//         <Spin indicator={<LoadingOutlined spin />} />
//       ) : repositories.length ? (
//         repositories.map((repo, i) => <GitHubRepo key={i} {...repo} />)
//       ) : (
//         <Typography.Text>No repository</Typography.Text>
//       )}
//     </TabContentWrapper>
//   );
// };

const Main = () => {
  return (
    <LayerManager>
      <MenuBar />
      <Shortcut.ResumeShortcut />
      <Shortcut.GitHubShortcut />
      <Shortcut.SettingsShortcut />
      <Shortcut.BlogShortcut />
      <Shortcut.ProfileShortcut />
      <Resume />
      <Settings />
      <Profile />
    </LayerManager>
  );
};

export default Main;
