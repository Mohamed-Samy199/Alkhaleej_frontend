import React, { Fragment, useContext } from 'react';
import { CategoryContext } from '../../Context/CategoryContext/Category';

const AllAdmins = ({ userData }) => {
    const { users, t, language } = useContext(CategoryContext);
    const allAdmins = users?.users?.filter((user) => user.role === "Admin");

    return (
        userData?.role === "Admin" ? (
            <div className="admin-page container mt-6 pt-3" dir={language === "ar" ? "rtl" : "ltr"}>
                <h3 className="my-2">{t("Admin Page")}</h3>
                <p className="text-muted mb-4">{t("All Admins Logging")}</p>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{t("Admin Id")}</th>
                            <th scope="col">{t("Name")}</th>
                            <th scope="col">{t("Email")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAdmins && allAdmins.map((admin, index) => (
                            <Fragment key={index}>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{admin.userName}</td>
                                    <td>{admin.email}</td>
                                </tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : null
    );
};

export default AllAdmins;
