import React, { Component } from 'react'
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import { IdentityPicture } from '../components/identity/IdentityPicture'
import { fileDownloadRequest, groupRequest, teacherConfirm } from '../../shared/request'
import { GoogleMap } from '../components/utils/GoogleMap'
import { Token } from '../shared/interface'
import { fetchIdentity, updateData, updatePassword } from '../../store/actions/identity'
import { Loader } from '../components/utils/Loader'
import { IdentitySettings } from '../components/identity/IdentitySettings'
import { IdentityGroups } from '../components/identity/IdentityGroup'
import { authActions } from '../../store/actions/auth'
import axios from '../../axios/axios'
import { fetchData } from '../../store/actions/shared'

interface settings {
  name: string
  value: Array<string>
}

class IdentityPage extends Component<any> {
  async componentDidMount() {
    if (!this.props.identityState?.email) {
      await this.props.fetchIdentity()
    }
    if (!this.props.groups?.length) {
      await this.props.fetchGroups()
    }
  }

  settings: Array<settings> = [
    { name: 'Profile settings', value: ['username', 'email', 'lastname', 'firstname'] },
    { name: 'Password settings', value: ['current', 'password', 'repeat Password'] }
  ]

  submitData = async (event: any, form: any) => {
    event.preventDefault()
    if (form.password) {
      await this.props.updatePassword({
        password: form.password,
        current: form.current
      })
    } else {
      await this.props.updateData({ ...form })
      this.props.fetchIdentity()
    }
  }

  confirmTeacherAccount = async () => {
    const { data: token }: any = await axios.post(teacherConfirm)
    if (token && token.token) {
      const decoded = jwt.decode(token.token as string)
      const tokenItems = decoded as Token
      this.props.authSuccess({ token: token.token, userId: tokenItems.sub, role: tokenItems.role })
    }
  }
  render() {
    const { role, groupLoading, groups, identityState } = this.props
    const { loading, error, imageSrc, ...identity } = identityState
    return (
      <main className="page">
        <div className="container">
          <h3 className="text-dark mb-4">Profile</h3>
          <div className="row mb-3">
            <div className="col-lg-4">
              <div className="card mb-3">
                {!loading && identity.imageSrc && (
                  <IdentityPicture
                    initialValue={`${fileDownloadRequest}?filename=${identity.imageSrc}`}
                  />
                )}
              </div>
              <div className="card mb-3">
                <div className="card-body text-center shadow justify-content-between">
                  <GoogleMap />
                  {groupLoading ? (
                    <Loader />
                  ) : role === 'Teacher' || role === 'Admin' ? (
                    !groups ? (
                      <p className="center">Нет групп</p>
                    ) : (
                      <IdentityGroups fetched={groups} />
                    )
                  ) : (
                    <button
                      disabled={loading}
                      className="btn btn-info"
                      onClick={this.confirmTeacherAccount}
                    >
                      Confirm* teacher account
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row">
                <div className="col">
                  {error && <span className="alert-warning">{error}</span>}
                  {loading ? (
                    <Loader />
                  ) : (
                    <IdentitySettings
                      loading={loading}
                      identity={identity}
                      settings={this.settings}
                      submitData={this.submitData}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state: any) => ({
  groupLoading: state.shared.loading,
  role: state.auth.role,
  groups: state.shared.groups,
  identityState: state.identity
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchGroups: () => dispatch(fetchData(groupRequest)),
  fetchIdentity: () => dispatch(fetchIdentity()),
  authSuccess: (data: any) => dispatch(authActions.authSuccess({ ...data })),
  updateData: (data: any) => dispatch(updateData({ ...data })),
  updatePassword: (data: any) => dispatch(updatePassword({ ...data }))
})
export default connect(mapStateToProps, mapDispatchToProps)(IdentityPage)
