export default {
  directives: {
    away: {
      update(el, bind, vnode) {
        if (vnode.context.opened && !vnode.context._closeEvent) {
          vnode.context._closeEvent = true
          document.body.addEventListener('click', vnode.context._close)
        } else if (!vnode.context.opened) {
          vnode.context._closeEvent = false
          document.body.removeEventListener('click', vnode.context._close)
        }
      }
    }
  },
  methods: {
    _close() {
      this.opened = false
    }
  },
  data: () => ({
    opened: false
  })
}