// import { Injectable } from '@angular/core';
// import { ServerNotificationService } from '@yes/core';
// import { NotifyType } from '@yes/core/enums';
// import { Role } from '@yes/core/interfaces/persistent';
// import { RoleService } from '@yes/core/services/ydm';
// import { ApiService } from '@yes/model';
// import { BehaviorSubject, Subject, Subscription, timer } from 'rxjs';
// import { delay, distinctUntilChanged, map, throttle } from 'rxjs/operators';
// import { RoleState } from '../model/role-state';

// /**
//  * Role Facade
//  */
// @Injectable()
// export class RoleFacade implements ApiService {
//   /**
//    * Current State
//    *
//    */
//   state: RoleState = {
//     loading: false,
//     roles: [],
//     selectedRoles: [],
//     rolesCount: 0,
//     role: null,
//   };

//   /**
//    * Subject to indicate when to patch the Role
//    *
//    */
//   patchRole = new Subject<void>();

//   /**
//    * Notifications subscription
//    *
//    */
//   private notifications: Subscription;

//   /**
//    * Subject for notification refresh
//    *
//    */
//   private notifRefreshSub = new Subject<string>();

//   /**
//    * subscription for notificaiton refresh
//    *
//    */
//   private notifRefresh: Subscription;

//   /**
//    * Store retrieved router command
//    */
//   items = new BehaviorSubject<RoleState>(this.state);

//   /**
//    * Observable of the state
//    *
//    */
//   state$ = this.items.asObservable();

//   /**
//    * Observable of the roles
//    *
//    */
//   roles$ = this.items.pipe(
//     map((state) => state.roles),
//     distinctUntilChanged()
//   );

//   /**
//    * Observable of the selected roles
//    *
//    */
//   selectedRoles$ = this.items.pipe(
//     map((state) => state.selectedRoles),
//     distinctUntilChanged()
//   );

//   /**
//    * Observable of the role
//    */
//   role$ = this.items.pipe(
//     map((state) => state.role),
//     distinctUntilChanged()
//   );

//   /**
//    * Observable of the roless count
//    *
//    */
//   rolesCount$ = this.items.pipe(
//     map((state) => state.rolesCount),
//     distinctUntilChanged()
//   );

//   /**
//    * Observable of the loading
//    *
//    */
//   loading$ = this.items.pipe(
//     map((state) => state.loading),
//     distinctUntilChanged()
//   );

//   /**
//    * Creates an instance of RoleFacade.
//    */
//   constructor(
//     private roleService: RoleService,
//     private serverNotification: ServerNotificationService
//   ) {}

//   /**
//    * Get selectedRoles
//    */
//   get selectedRoles() {
//     return this.state.selectedRoles;
//   }

//   /**
//    * Get role
//    */
//   get role() {
//     return this.state.role;
//   }

//   /**
//    * Set the state
//    *
//    */
//   set(role: RoleState) {
//     this.items.next((this.state = role));
//   }

//   /**
//    * Reset edit
//    */
//   resetEdit() {
//     this.set({
//       ...this.state,
//       role: null,
//     });
//   }

//   /**
//    * Start listen to notifications
//    *
//    */
//   startListenToNotifications() {
//     if (!this.notifRefresh) {
//       this.notifRefresh = this.notifRefreshSub
//         .pipe(
//           throttle(() => timer(1000)),
//           delay(1000)
//         )
//         .subscribe((x) => {
//           if (x) {
//             this.getSingle(+x).subscribe((x) => {
//               this.set({
//                 ...this.state,
//                 role: x,
//               });
//               this.patchRole.next();
//             });
//           }
//         });
//     }
//     if (!this.notifications) {
//       this.notifications = this.serverNotification
//         .getMessage()
//         .subscribe((x) => {
//           if (
//             x.body.K &&
//             x.body.K.model === 'Role' &&
//             x.type === NotifyType.MODEL_EDIT &&
//             +x.body.K.id === this.state.role?.id
//           ) {
//             this.notifRefreshSub.next(x.body.K.id);
//           }
//         });
//     }
//   }

//   /**
//    * Stop listen to notifications
//    *
//    */
//   stopListenToNotifications() {
//     if (this.notifications) {
//       this.notifications.unsubscribe();
//     }
//     if (this.notifRefresh) {
//       this.notifRefresh.unsubscribe();
//     }
//   }

//   /**
//    * Get the studio by id and set state
//    *
//    * @param id Id of the studio
//    */
//   getRole(id: string, duplicate: boolean) {
//     this.set({
//       ...this.state,
//       loading: true,
//     });
//     if (+id !== -1) {
//       this.getSingle(+id).subscribe((x) => {
//         this.set({
//           ...this.state,
//           loading: false,
//           role: duplicate ? { ...x, id: null } : x,
//         });
//         this.startListenToNotifications();
//       });
//     } else {
//       this.set({
//         ...this.state,
//         loading: false,
//         role: {
//           id: null,
//           name: '',
//           type: 0,
//           notes: '',
//         },
//       });
//     }
//   }

//   /**
//    * Gets all the items based on filters
//    *
//    * @param [query] Search string
//    * @param [from] Start index (for pagination)
//    * @param [len] Number of elements retrieved (for pagination)
//    * @param [order] Order of search
//    */
//   getAll(query?: string, from?: number, len?: number, order?: string) {
//     this.set({
//       ...this.state,
//       loading: true,
//     });
//     this.roleService.getAll(query, from, len, order).subscribe((x) => {
//       let selectedRoles = [];
//       if (this.state.selectedRoles?.length) {
//         selectedRoles = x.filter(
//           (x) => this.state.selectedRoles.findIndex((y) => y.id === x.id) !== -1
//         );
//       }

//       this.set({
//         ...this.state,
//         loading: false,
//         roles: x,
//         selectedRoles,
//       });
//     });
//   }

//   /**
//    * Gets the counts of the elements based on the search
//    *
//    * @param [query=''] The search string
//    */
//   getCount(query?: string) {
//     this.roleService.getCount(query).subscribe((x) =>
//       this.set({
//         ...this.state,
//         rolesCount: x,
//       })
//     );
//   }

//   /**
//    * Retrieves a single items with the specified id
//    *
//    * @param id The id of the items
//    * @returns The items
//    */
//   getSingle(id: number) {
//     return this.roleService.getSingle(id);
//   }

//   /**
//    * Add a new items
//    *
//    * @param items The items to add
//    * @returns The items added
//    */
//   add(item: Role) {
//     item.id = null;
//     return this.roleService.add(item);
//   }

//   /**
//    * Update the items with the specified id
//    *
//    * @param id The id of the items
//    * @param item The modified items
//    * @returns Response
//    */
//   update(id: number, item: Role) {
//     return this.roleService.update(id, item);
//   }

//   /**
//    * Delete the selected itemss
//    *
//    * @param selected The selected itemss
//    * @returns Response
//    */
//   delete(selected: Role[]) {
//     return this.roleService.delete(selected);
//   }

//   /**
//    * Set selected roles
//    *
//    * @param roles The selected roles
//    */
//   setSelected(selectedRoles: Role[]) {
//     this.set({
//       ...this.state,
//       selectedRoles,
//     });
//   }
// }
