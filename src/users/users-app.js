import usersStore from "./store/users-store";
import { renderTable } from "./presentation/render-table/render-table";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderModal } from "./presentation/render-modal/render-modal";
import { saveUser } from "./use-cases/save-user";

/**
 *
 * @param {HTMLDivElement} element
 */
export const UsersApp = async (elements) => {
  elements.innerHTML = "Loading...";
  await usersStore.loadNextPage();
  elements.innerHTML = "";

  renderTable(elements);
  renderButtons(elements);
  renderAddButton(elements);
  renderModal(elements, async (userLike) => {
    const user = await saveUser(userLike);
    usersStore.onUserChanged(user);
    renderTable();
  });
};
