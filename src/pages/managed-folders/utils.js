export const canManageFolder = (folder) => folder?.myRole === 'admin'

export const canMutateManagedLink = (folder, link, userId) => (
  canManageFolder(folder) || String(link?.createdBy?.id) === String(userId)
)

export const isLastAdminMember = (folder, member) => {
  const admins = (folder?.members || []).filter((m) => m.role === 'admin')
  return member?.role === 'admin' && admins.length <= 1
}

export const getFolderMember = (folder, userId) => (
  (folder?.members || []).find((member) => String(member.userId) === String(userId)) || null
)
