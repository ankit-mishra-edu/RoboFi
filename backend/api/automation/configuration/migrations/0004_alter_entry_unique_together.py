# Generated by Django 4.0 on 2022-02-22 13:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_profile_birth_date'),
        ('configuration', '0003_entry_user'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='entry',
            unique_together={('user', 'name')},
        ),
    ]