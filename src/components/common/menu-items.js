function menuItem(title, permission, key, order, route, submenu = []) {
    return {
      title: title,
      permission: permission,
      key: key,
      icon: order,
      route: route,
    };
  }
  
  export default [
    menuItem('Transactions', 'PER_TRANSACTIONS', 'menukey_transaction', 1, '/transactions'),
    // menuItem('Cards', 'CARDS', 'menukey_cards', 2, '/cards'),
    menuItem('Members', 'PER_MEMBERS', 'menukey_members', '', '/members'),
    menuItem('Users', 'PER_USERS', 'menukey_users', '', '/users'),
    menuItem('Employees', 'PER_EMPLOYEES', 'menukey_employees', '', '/employees'),
  ];
  