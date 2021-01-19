export default {
  route: {
    dashboard: 'Panel de control',
    introduction: 'Introducción',
    documentation: 'Documentación',
    guide: 'Guía',
    permission: 'Permisos',
    rolePermission: 'Permisos de rol',
    pagePermission: 'Permisos de la página',
    directivePermission: 'Permisos de la directiva',
    icons: 'Iconos',
    components: 'Componentes',
    componentIndex: 'Introducción',
    markdown: 'Markdown',
    splitPane: 'Panel dividido',
    avatarUpload: 'Subir avatar',
    dropzone: 'Subir ficheros',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    dragDialog: 'Drag Dialog',
    nested: 'Rutas anidadass',
    form: 'Formulario',
    createArticle: 'Crear artículo',
    editArticle: 'Editar artículo',
    articleList: 'Listado de artículos',
    errorPages: 'Páginas de error',
    page401: '401',
    page404: '404',
    excel: 'Excel',
    exportExcel: 'Exportar a Excel',
    selectExcel: 'Export seleccionado',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Subir Excel',
    theme: 'Tema',
    i18n: 'I18n',
    externalLink: 'Enlace externo'
  },
  navbar: {
    logOut: 'Salir',
    dashboard: 'Panel de control',
    github: 'Github',
    theme: 'Tema',
    size: 'Tamaño global'
  },
  login: {
    title: 'Formulario de acceso',
    logIn: 'Acceso',
    userName: 'Usuario',
    password: 'Contraseña',
    any: 'nada',
    thirdparty: 'Conectar con',
    thirdpartyTips: 'No se puede simular en local, así que combine su propia simulación de negocios. ! !'
  },
  documentation: {
    documentation: 'Documentación',
    github: 'Repositorio Github'
  },
  permission: {
    addRole: 'Nuevo rol',
    editPermission: 'Permiso de edición',
    roles: 'Tus permisos',
    switchRoles: 'Cambiar permisos',
    tips: 'In some cases it is not suitable to use v-permission, such as element Tab component or el-table-column and other asynchronous rendering dom cases which can only be achieved by manually setting the v-if.',
    delete: 'Borrar',
    confirm: 'Confirmar',
    cancel: 'Cancelar'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Ver guía'
  },
  components: {
    documentation: 'Documentación',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'Orden por defecto',
    dragTips2: 'The after dragging order',
    title: 'Título',
    importance: 'Importancia',
    type: 'Tipo',
    remark: 'Remark',
    search: 'Buscar',
    add: 'Añadir',
    export: 'Exportar',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Fecha',
    author: 'Autor',
    readings: 'Lector',
    status: 'Estado',
    actions: 'Acciones',
    edit: 'Editar',
    publish: 'Publicar',
    draft: 'Draft',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    confirm: 'Confirmar'
  },
  excel: {
    export: 'Exportar',
    selectedExport: 'Exportar seleccionados',
    placeholder: 'Por favor escribe un nombre de fichero'
  },
  theme: {
    change: 'Cambiar tema',
    documentation: 'Documentación del tema',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Actualizar',
    close: 'Cerrar',
    closeOthers: 'Cerrar otros',
    closeAll: 'Cerrar todos'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  }
}
